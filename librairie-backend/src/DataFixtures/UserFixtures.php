<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $adminUsers = [
            ['nom' => 'Dupont', 'prenom' => 'Jean', 'email' => 'jean.dupont@example.com'],
            ['nom' => 'Martin', 'prenom' => 'Marie', 'email' => 'marie.martin@example.com'],
            ['nom' => 'Durand', 'prenom' => 'Pierre', 'email' => 'pierre.durand@example.com'],
            ['nom' => 'Leroy', 'prenom' => 'Lucie', 'email' => 'lucie.leroy@example.com'],
        ];

        foreach ($adminUsers as $adminData) {
            $user = new User();
            $user->setNom($adminData['nom']);
            $user->setPrenom($adminData['prenom']);
            $user->setEmail($adminData['email']);
            $user->setRoles(['ROLE_ADMIN']);
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, 'admin123') // Assurez-vous de définir un mot de passe sécuritaire
            );

            $manager->persist($user);
        }

        $manager->flush();
    }
}
