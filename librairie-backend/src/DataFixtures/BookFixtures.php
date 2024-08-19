<?php

// src/DataFixtures/BookFixtures.php
namespace App\DataFixtures;

use App\Entity\Categorie;
use App\Entity\Livre;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BookFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
    // Existing categories
    $fantaisie = new Categorie();
    $fantaisie->setNom('Fantaisie');
    $manager->persist($fantaisie);

    $scienceFiction = new Categorie();
    $scienceFiction->setNom('Science-fiction');
    $manager->persist($scienceFiction);

    $polar = new Categorie();
    $polar->setNom('Polar');
    $manager->persist($polar);

    $bandeDessinee = new Categorie();
    $bandeDessinee->setNom('Bande Dessinée');
    $manager->persist($bandeDessinee);

    $classique = new Categorie();
    $classique->setNom('Classique');
    $manager->persist($classique);

        // Create books
        $books = [
            // Fantaisie
            [
                'titre' => 'Le Seigneur des anneaux',
                'auteur' => 'J.R.R Tolkien',
                'editeur' => 'Pocket',
                'datePublication' => new \DateTime('1954-01-01'),
                'resume' => 'Une contrée paisible où vivent les Hobbits. Un anneau magique à la puissance infinie...',
                'image' => 'https://m.media-amazon.com/images/I/71SM1QXCImL._SL1139_.jpg',
                'categorie' => $fantaisie
            ],
            [
                'titre' => 'Game of Thrones',
                'auteur' => 'George R.R. Martin',
                'editeur' => 'Pocket',
                'datePublication' => new \DateTime('1996-01-01'),
                'resume' => 'Le royaume des Sept Couronnes est sur le point de connaître son plus terrible hiver...',
                'image' => 'https://m.media-amazon.com/images/I/71xwnDO9PBL._SL1181_.jpg',
                'categorie' => $fantaisie
            ],
            [
                'titre' => 'Gagner la guerre',
                'auteur' => 'Jean-Philippe Jaworski',
                'editeur' => 'Folio',
                'datePublication' => new \DateTime('2009-01-01'),
                'resume' => 'Gagner une guerre, c\'est bien joli, mais quand il faut partager le butin entre les vainqueurs...',
                'image' => 'https://m.media-amazon.com/images/I/7109gL1swXL._SL1051_.jpg',
                'categorie' => $fantaisie
            ],
            // Science-fiction
            [
                'titre' => 'Projet Dernière Chance',
                'auteur' => 'Andy Weir',
                'editeur' => 'Bragelonne',
                'datePublication' => new \DateTime('2021-01-01'),
                'resume' => 'Ryland Grace se réveille seul à bord d\'un vaisseau spatial, sans aucun souvenir...',
                'image' => 'https://m.media-amazon.com/images/I/81iM3aHpnhL._SL1500_.jpg',
                'categorie' => $scienceFiction
            ],
            [
                'titre' => '1984',
                'auteur' => 'George Orwell',
                'editeur' => 'FOLIO',
                'datePublication' => new \DateTime('1949-01-01'),
                'resume' => 'Dans un monde totalitaire divisé en trois superpuissances, Winston Smith...',
                'image' => 'https://m.media-amazon.com/images/I/71Y9X7FYkcL._SL1500_.jpg',
                'categorie' => $scienceFiction
            ],
            [
                'titre' => 'Ubik',
                'auteur' => 'Philip K. Dick',
                'editeur' => 'J’ai Lu',
                'datePublication' => new \DateTime('1969-01-01'),
                'resume' => 'Dans un futur où les pouvoirs psychiques sont courants, Joe Chip travaille pour...',
                'image' => 'https://m.media-amazon.com/images/I/61VDzP76tbL._SL1051_.jpg',
                'categorie' => $scienceFiction
            ],
            [
                'titre' => 'Dune',
                'auteur' => 'Frank Herbert',
                'editeur' => 'Pocket',
                'datePublication' => new \DateTime('1965-01-01'),
                'resume' => 'Dans un futur lointain, le jeune Paul Atréides et sa famille sont envoyés sur Arrakis...',
                'image' => 'https://m.media-amazon.com/images/I/61HLU-TCZ8L._SL1311_.jpg',
                'categorie' => $scienceFiction
            ],
            [
                'titre' => 'Hypérion',
                'auteur' => 'Dan Simmons',
                'editeur' => 'Pocket',
                'datePublication' => new \DateTime('1989-01-01'),
                'resume' => 'Dans un futur lointain, sept pèlerins sont choisis pour un voyage final vers Hypérion...',
                'image' => 'https://m.media-amazon.com/images/I/61Rge7yYTPL._SL1139_.jpg',
                'categorie' => $scienceFiction
            ],
            // Polar
            [
                'titre' => 'Le silence des agneaux',
                'auteur' => 'Thomas Harris',
                'editeur' => 'Pocket',
                'datePublication' => new \DateTime('1988-01-01'),
                'resume' => 'Clarice Starling, jeune stagiaire du FBI, est chargée d\'interroger le Dr Hannibal Lecter...',
                'image' => 'https://m.media-amazon.com/images/I/61hEowVf8rL._SL1311_.jpg',
                'categorie' => $polar
            ],
            [
                'titre' => 'Les hommes qui n\'aimaient pas les femmes',
                'auteur' => 'Stieg Larsson',
                'editeur' => 'Fisical_Book',
                'datePublication' => new \DateTime('2006-01-01'),
                'resume' => 'Mikael Blomkvist, un journaliste en disgrâce, est engagé pour enquêter sur une disparition vieille de 40 ans...',
                'image' => 'https://m.media-amazon.com/images/I/41IYBDwU0-L.jpg',
                'categorie' => $polar
            ],
            [
                'titre' => 'Double assassinat dans la rue Morgue / La lettre volée',
                'auteur' => 'Edgar Allan Poe',
                'editeur' => 'Folio Junior',
                'datePublication' => new \DateTime('1841-01-01'),
                'resume' => 'Ce recueil comprend deux des plus célèbres nouvelles de Poe mettant en scène le détective Auguste Dupin...',
                'image' => 'https://m.media-amazon.com/images/I/81Q8FVX0ocL._SL1500_.jpg',
                'categorie' => $polar
            ],
                    // Bande Dessinée
        [
            'titre' => 'Panthère',
            'auteur' => 'Brecht Evens',
            'editeur' => 'Actes Sud Bd',
            'datePublication' => new \DateTime('2019-01-01'),
            'resume' => 'Le prince Panthère, dandy, charmeur, vient réconforter la jeune Christine...',
            'image' => 'https://static.fnac-static.com/multimedia/Images/FR/NR/6b/19/5e/6166891/1540-0/tsp20191017070731/Panthere.jpg',
            'categorie' => $bandeDessinee
        ],
        [
            'titre' => 'Le Monde sans fin',
            'auteur' => 'Christophe Blain',
            'editeur' => 'Dargaud',
            'datePublication' => new \DateTime('2021-01-01'),
            'resume' => 'La rencontre entre un auteur majeur de la bande dessinée et un éminent spécialiste...',
            'image' => 'https://static.fnac-static.com/multimedia/Images/FR/NR/32/c5/be/12502322/1507-1/tsp20230701075843/Le-Monde-sans-fin-miracle-energetique-et-derive-climatique.jpg',
            'categorie' => $bandeDessinee
        ],
        [
            'titre' => 'Derrière le portail',
            'auteur' => 'Emy Bill',
            'editeur' => 'Leduc Graphic',
            'datePublication' => new \DateTime('2024-01-01'),
            'resume' => '1er septembre : Valentin, 10 ans, découvre sa nouvelle école avec enthousiasme...',
            'image' => 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/2f/dd/10/17882415/1507-1/tsp20240626075614/Derriere-le-portail.jpg',
            'categorie' => $bandeDessinee
        ],
        [
            'titre' => 'Monster',
            'auteur' => 'Takashi Nagasaki',
            'editeur' => 'Kana',
            'datePublication' => new \DateTime('2010-01-01'),
            'resume' => 'Considéré au Japon comme le thriller des années \'90, "Monster" de Naoki Urasawa...',
            'image' => 'https://m.media-amazon.com/images/I/71Dwvq6b6PL._SL1417_.jpg',
            'categorie' => $bandeDessinee
        ],
        [
            'titre' => 'Sin City T1',
            'auteur' => 'Franck Miller',
            'editeur' => 'Rackham',
            'datePublication' => new \DateTime('2023-09-22'),
            'resume' => 'Entre les détectives corrompus et les femmes fatales aux abois, ce colosse au physique ingrat...',
            'image' => 'https://m.media-amazon.com/images/I/71i2V+WniwL._SL1500_.jpg',
            'categorie' => $bandeDessinee
        ],
        // Classique
        [
            'titre' => 'Crime et châtiment',
            'auteur' => 'Fiodor Dostoïevski',
            'editeur' => 'Babel',
            'datePublication' => new \DateTime('1866-01-01'),
            'resume' => 'L’acte fondateur du roman est le meurtre de la vieille usurière, dans un immeuble de Saint-Pétersbourg...',
            'image' => 'https://m.media-amazon.com/images/I/81KxRRhNvWL._SL1500_.jpg',
            'categorie' => $classique
        ],
        [
            'titre' => 'Madame Bovary',
            'auteur' => 'Gustave Flaubert',
            'editeur' => 'Flammarion',
            'datePublication' => new \DateTime('1856-01-01'),
            'resume' => 'En 1857, Madame Bovary fait scandale. Poursuivi pour "outrage à la morale publique et religieuse et aux bonnes moeurs"...',
            'image' => 'https://m.media-amazon.com/images/I/71tETVwL7YL._SL1051_.jpg',
            'categorie' => $classique
        ],
        [
            'titre' => 'Cent ans de solitude',
            'auteur' => 'Gabriel Garcia Marquez',
            'editeur' => 'Points',
            'datePublication' => new \DateTime('1967-01-01'),
            'resume' => 'À Macondo, petit village isolé d’Amérique du Sud, l’illustre famille Buendia est condamnée à cent ans de solitude...',
            'image' => 'https://m.media-amazon.com/images/I/91dQd82Wx3L._SL1500_.jpg',
            'categorie' => $classique
        ],
        [
            'titre' => 'Le Nom de la rose',
            'auteur' => 'Umberto Eco',
            'editeur' => 'Le Livre de Poche',
            'datePublication' => new \DateTime('1980-01-01'),
            'resume' => 'En l’an de grâce et de disgrâce 1327, rien ne va plus dans la chrétienté. Des bandes d\'hérétiques sillonnent les royaumes...',
            'image' => 'https://m.media-amazon.com/images/I/81W6mh0rv1L._SL1500_.jpg',
            'categorie' => $classique
        ],
        [
            'titre' => 'La mort à Venise',
            'auteur' => 'Thomas Mann',
            'editeur' => 'Le Livre de Poche',
            'datePublication' => new \DateTime('1912-01-01'),
            'resume' => 'La Mort à Venise est le récit de la passion folle et fatale qui saisit un écrivain d’âge mûr à l’apparition d’un gracieux adolescent...',
            'image' => 'https://m.media-amazon.com/images/I/81ATqbOfNXL._SL1500_.jpg',
            'categorie' => $classique
        ]
        ];

        foreach ($books as $bookData) {
            $book = new Livre();
            $book->setTitre($bookData['titre']);
            $book->setAuteur($bookData['auteur']);
            $book->setEditeur($bookData['editeur']);
            $book->setDatePublication($bookData['datePublication']);
            $book->setDescription($bookData['resume']);
            $book->setImage($bookData['image']);
            $book->setCategorie($bookData['categorie']);
            $book->setQuantite(20); // Default value
            $book->setPrix(15.99);  // Default value
            $manager->persist($book);
        }

        $manager->flush();
    }
}
