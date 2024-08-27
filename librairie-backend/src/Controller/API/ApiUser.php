<?php

namespace App\Controller\API;

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
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


#[Route('/api/user', name: 'api_')]
class ApiUser extends AbstractController
{




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


    #[Route('/me', name: 'get_user_data', methods: ['GET'])]
    public function getUserData(TokenStorageInterface $tokenStorage, SerializerInterface $serializer): JsonResponse
    {
        $token = $tokenStorage->getToken();

        if (!$token) {
            return new JsonResponse(['error' => 'No token found'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$token->getUser()) {
            return new JsonResponse(['error' => 'No user found in token'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();

        // Serialize user data
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'api_user_methods']);

        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    #[Route('/edit', name: 'update_user_data', methods: ['POST'])]
    public function editUserData(
        TokenStorageInterface $tokenStorage, 
        Request $request, 
        EntityManagerInterface $entityManager, 
        SerializerInterface $serializer, 
        ValidatorInterface $validator
    ): JsonResponse {
        $token = $tokenStorage->getToken();
    
        if (!$token) {
            return new JsonResponse(['error' => 'No token found'], Response::HTTP_UNAUTHORIZED);
        }
    
        $user = $token->getUser();
    
        if (!$user || !$user instanceof User) {
            return new JsonResponse(['error' => 'No user found in token'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Récupérer et désérialiser les données de la requête
        $data = json_decode($request->getContent(), true);
    
        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON data'], Response::HTTP_BAD_REQUEST);
        }
    
        // Mettre à jour les informations de l'utilisateur
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }
    
        if (isset($data['prenom'])) {
            $user->setPrenom($data['prenom']);
        }
    
        if (isset($data['nom'])) {
            $user->setNom($data['nom']);
        }
    
        // Validation des données
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return new JsonResponse(['error' => $errorsString], Response::HTTP_BAD_REQUEST);
        }
    
        // Persister les changements en base de données
        $entityManager->persist($user);
        $entityManager->flush();
    
        // Retourner l'utilisateur mis à jour
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'api_user_methods']);
    
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }
    

}
