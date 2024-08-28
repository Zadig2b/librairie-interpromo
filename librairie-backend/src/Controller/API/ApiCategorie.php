<?php

namespace App\Controller\API;

use App\Repository\LivreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\CategorieRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


#[Route('/api', name: 'api_')]
class ApiCategorie extends AbstractController
{




    




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

}
