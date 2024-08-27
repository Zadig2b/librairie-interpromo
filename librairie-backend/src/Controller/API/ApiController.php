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
use App\Repository\CategorieRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
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


    #[Route('/categories', name: 'categories', methods: ['GET'])]
    public function getCategories(SerializerInterface $serializer, CategorieRepository $categorieRepository): JsonResponse
    {
        // Find the category by its name
        $categories = $categorieRepository->findAll();
    
        // If the category doesn't exist, return a 404 error
        if (!$categories) {
            return new JsonResponse(['error' => 'Categories not found'], Response::HTTP_NOT_FOUND);
        }
    
        // Serialize the books
        $jsonCategories = $serializer->serialize($categories, 'json', ['groups' => 'api_livre_methods']);
    
        return new JsonResponse($jsonCategories, Response::HTTP_OK, [], true);
    }

    #[Route('/categorie/{nom}', name: 'book_by_cat_name', methods: ['GET'])]
    public function getBookByCatName(string $nom, SerializerInterface $serializer, LivreRepository $livreRepository, CategorieRepository $categorieRepository): JsonResponse
    {
        // Find the category by its name
        $categorie = $categorieRepository->findOneBy(['nom' => $nom]);
    
        // If the category doesn't exist, return a 404 error
        if (!$categorie) {
            return new JsonResponse(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }
    
        // Find books associated with the category
        $livres = $livreRepository->findBy(['categorie' => $categorie]);
    
        // Serialize the books
        $jsonLivre = $serializer->serialize($livres, 'json', ['groups' => 'api_livre_methods']);
    
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


    

}
