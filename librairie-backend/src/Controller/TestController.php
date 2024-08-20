<?php 
// src/Controller/TestController.php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Livre;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TestController extends AbstractController
{
    #[Route('/test-serialization', name: 'test_serialization')]
    public function testSerialization(SerializerInterface $serializer): JsonResponse
    {
        $categorie = new Categorie();
        $categorie->setNom('Fantasy');
        
        $livre = new Livre();
        $livre->setTitre('The Hobbit');
        $livre->setCategorie($categorie);
        
        $data = $serializer->serialize($livre, 'json', ['groups' => 'api_livre_methods']);
        
        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }
}
