<?php

namespace App\Controller\API;

use App\Entity\Livre;
use App\Repository\LivreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface as HasherUserPasswordHasherInterface;


#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route('/livres', name: 'livres', methods: ['GET'])]
    public function getAllBooks(LivreRepository $livreRepository, SerializerInterface $serializer): JsonResponse
    {
        $livres = $livreRepository->findAll();
        $jsonLivres = $serializer->serialize($livres, 'json', ['groups' => 'api_livre_methods']);
        return new JsonResponse($jsonLivres, Response::HTTP_OK, [], true);
    }

    #[Route('/livre/{id}', name: 'livre_detail', methods: ['GET'])]
    public function getBookDetail(int $id, SerializerInterface $serializer, LivreRepository $livreRepository): JsonResponse
    {
        $livre = $livreRepository->find($id);

        if (!$livre) {
            return new JsonResponse(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonLivre = $serializer->serialize($livre, 'json', ['groups' => 'api_livre_methods']);
        return new JsonResponse($jsonLivre, Response::HTTP_OK, [], true);
    }

    #[Route('/livre/new', name: 'livre_new', methods: ['POST'])]
    public function createBook(
        Request $request,
        EntityManagerInterface $em,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ): JsonResponse {
        $livre = $serializer->deserialize(
            $request->getContent(),
            Livre::class,
            'json',
            ['groups' => 'api_livre_methods']
        );

        $errors = $validator->validate($livre);

        if ($errors->count()) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return $this->json($messages, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $em->persist($livre);
        $em->flush();

        return $this->json(['message' => 'Book saved successfully'], Response::HTTP_CREATED);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(
        Request $request,
        HasherUserPasswordHasherInterface $passwordHasher,
        UserRepository $userRepository,
        JWTTokenManagerInterface $jwtManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        // Load user by email
        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Check password validity
        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        // Generate JWT token
        $token = $jwtManager->create($user);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        HasherUserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        // Decode the JSON request content
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $prenom = $data['prenom'] ?? null;
        $nom = $data['nom'] ?? null;

        // Validate the required fields
        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        // Check if the user already exists
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'User already exists'], Response::HTTP_CONFLICT);
        }

        // Create a new user entity
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));
        $user->setPrenom($prenom);
        $user->setNom($nom);

        // Validate the new user entity
        $errors = $validator->validate($user);
        if ($errors->count()) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return $this->json($messages, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Persist and flush the user entity
        $em->persist($user);
        $em->flush();

        // Return success response
        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }
}
