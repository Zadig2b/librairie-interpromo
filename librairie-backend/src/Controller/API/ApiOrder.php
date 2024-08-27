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
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Entity\Commande;

#[Route('/api/order', name: 'api_')]
class ApiOrder extends AbstractController
{
    private $entityManager;
    private $tokenStorage;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }


    #[Route('/new', name: 'create_commande', methods: ['POST'])]
    public function createCommande(TokenStorageInterface $tokenStorage, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérifier que l'ID du livre est présent
        if (!isset($data['livre_id'])) {
            return new JsonResponse(['error' => 'Livre ID is required'], 400);
        }

        // Récupérer l'utilisateur actuel
        $token = $tokenStorage->getToken();

        if (!$token) {
            return new JsonResponse(['error' => 'No token found'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$token->getUser()) {
            return new JsonResponse(['error' => 'No user found in token'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], 401); 
        }

        // Récupérer le livre
        $livre = $this->entityManager->getRepository(Livre::class)->find($data['livre_id']);

        if (!$livre) {
            return new JsonResponse(['error' => 'Livre not found'], 404); 
        }

        // Créer une nouvelle commande
        $commande = new Commande();
        $commande->setUserId($user); // Set the User entity
        $commande->setStatut('en cours');

        // Associer le livre à la commande
        $commande->addBookId($livre);

        // Persister et sauvegarder
        $this->entityManager->persist($commande);
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Commande créée avec succès',
            'commandeId' => $commande->getId(),
            'livreId' => $livre->getId(),
            'statut' => $commande->getStatut(),
        ], 201); // CREATED status code
    }
    #[Route('/orders', name: 'get_user_orders', methods: ['GET'])]
    public function getUserOrders(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();

        if (!$token || !$token->getUser()) {
            return new JsonResponse(['error' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();
        $orders = $this->entityManager->getRepository(Commande::class)->findBy(['user_id' => $user]);

        $orderData = [];

        foreach ($orders as $order) {
            $orderData[] = [
                'id' => $order->getId(),
                'statut' => $order->getStatut(),
                // 'createdAt' => $order->getCreatedAt(),
                'books' => array_map(function($livre) {
                    return [
                        'id' => $livre->getId(),
                        'titre' => $livre->getTitre(),
                        'auteur' => $livre->getAuteur(),
                        'prix' => $livre->getPrix(),
                        'image' => $livre->getImage(),
                        'description' => $livre->getDescription(),
                    ];
                }, $order->getBookId()->toArray()),
                // Add other relevant fields as necessary
            ];
        }

        return new JsonResponse($orderData, 200);
    }
}