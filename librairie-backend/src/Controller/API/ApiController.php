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

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route('/livres', name: 'livres', methods: ['GET'])]
    public function getAllBooks(LivreRepository $livreRepository, SerializerInterface $serializer): JsonResponse
    {
        // Fetch all books from the repository
        $livres = $livreRepository->findAll();

        // Serialize the books to JSON format
        $jsonLivres = $serializer->serialize($livres, 'json', ['groups' => 'api_livre_methods']);

        // Return the JSON response
        return new JsonResponse($jsonLivres, Response::HTTP_OK, [], true);
    }

    #[Route('/livre/{id}', name: 'livre_detail', methods: ['GET'])]
    public function getBookDetail(int $id, SerializerInterface $serializer, LivreRepository $livreRepository): JsonResponse
    {
        // Fetch a specific book by ID
        $livre = $livreRepository->find($id);

        if (!$livre) {
            // Return 404 if the book is not found
            return new JsonResponse(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }

        // Serialize the book to JSON format
        $jsonLivre = $serializer->serialize($livre, 'json', ['groups' => 'api_livre_methods']);

        // Return the JSON response
        return new JsonResponse($jsonLivre, Response::HTTP_OK, [], true);
    }

    // Example of creating a new book
    #[Route('/livre/new', name: 'livre_new', methods: ['POST'])]
    public function createBook(
        Request $request,
        EntityManagerInterface $em,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ): JsonResponse {
        // Deserialize JSON payload into Livre entity
        $livre = $serializer->deserialize(
            $request->getContent(),
            Livre::class,
            'json',
            ['groups' => 'api_livre_methods']
        );

        // Validate the Livre entity
        $errors = $validator->validate($livre);

        if ($errors->count()) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return $this->json($messages, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Persist and flush Livre entity
        $em->persist($livre);
        $em->flush();

        // Return success response
        return $this->json(['message' => 'Book saved successfully'], Response::HTTP_CREATED);
    }
}
