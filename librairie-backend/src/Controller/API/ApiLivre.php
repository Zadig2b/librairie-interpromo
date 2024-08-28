<?php

namespace App\Controller\API;

use App\Entity\Livre;
use App\Repository\LivreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


#[Route('/api', name: 'api_')]
class ApiLivre extends AbstractController
{
    private $entityManager;
    private $tokenStorage;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }



    
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


    #[Route('/livre/delete/{id}', name: 'livre_delete', methods: ['DELETE'])]
    public function deleteBook(int $id, LivreRepository $livreRepository): JsonResponse
    {
        // Retrieve the currently authenticated user
        $user = $this->tokenStorage->getToken()->getUser();

        // Check if the user is authenticated and has the ROLE_ADMIN role
        if (!$user || !in_array('ROLE_ADMIN', $user->getRoles())) {
            throw new AccessDeniedException('You do not have permission to delete this book.');
        }

        // Find the book by its ID
        $livre = $livreRepository->find($id);

        // If the book doesn't exist, return a 404 error
        if (!$livre) {
            return new JsonResponse(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }

        // Remove the book from the database
        $this->entityManager->remove($livre);
        $this->entityManager->flush();

        // Return a success response
        return new JsonResponse(['message' => 'Book deleted successfully'], Response::HTTP_OK);
    } 
    #[Route('/livre/edit/{id}', name: 'livre_edit', methods: ['PUT'])]
    public function editBook(
        int $id,
        Request $request,
        LivreRepository $livreRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ): JsonResponse {
        // Retrieve the book by its ID
        $livre = $livreRepository->find($id);

        // If the book doesn't exist, return a 404 error
        if (!$livre) {
            return new JsonResponse(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }

        // Deserialize the request content to get the updated book data
        $updatedLivre = $serializer->deserialize(
            $request->getContent(),
            Livre::class,
            'json',
            ['groups' => 'api_livre_methods']
        );

        // Update the book's properties
        $livre->setTitre($updatedLivre->getTitre());
        $livre->setAuteur($updatedLivre->getAuteur());
        $livre->setEditeur($updatedLivre->getEditeur());
        $livre->setDatePublication($updatedLivre->getDatePublication());
        $livre->setDescription($updatedLivre->getDescription());
        $livre->setQuantite($updatedLivre->getQuantite());
        $livre->setPrix($updatedLivre->getPrix());
        $livre->setImage($updatedLivre->getImage());

        // Validate the updated book data
        $errors = $validator->validate($livre);

        if ($errors->count()) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return $this->json($messages, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Save the updated book
        $this->entityManager->flush();

        return $this->json(['message' => 'Book updated successfully'], Response::HTTP_OK);
    }
}
