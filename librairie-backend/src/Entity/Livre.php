<?php

namespace App\Entity;

use App\Repository\LivreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LivreRepository::class)]
class Livre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['api_livre_methods'])]
    private ?int $id = null;

    #[ORM\Column(length: 500)]
    #[Groups(['api_livre_methods'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255)]
    #[Groups(['api_livre_methods'])]
    private ?string $auteur = null;

    #[ORM\Column(length: 255)]
    #[Groups(['api_livre_methods'])]
    private ?string $editeur = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['api_livre_methods'])]
    private ?\DateTimeInterface $datePublication = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['api_livre_methods'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['api_livre_methods'])]
    private ?int $quantite = null;

    #[ORM\Column]
    #[Groups(['api_livre_methods'])]
    private ?float $prix = null;

    #[ORM\ManyToOne(inversedBy: 'livres')]
    #[Groups(['api_livre_methods'])]
    private ?Categorie $categorie = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['api_livre_methods'])]
    private ?string $image = null;

    #[ORM\ManyToMany(targetEntity: Commande::class, mappedBy: 'book_id')]
    private Collection $commandes;

    public function __construct()
    {
        $this->commandes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getAuteur(): ?string
    {
        return $this->auteur;
    }

    public function setAuteur(string $auteur): static
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function getEditeur(): ?string
    {
        return $this->editeur;
    }

    public function setEditeur(string $editeur): static
    {
        $this->editeur = $editeur;

        return $this;
    }

    public function getDatePublication(): ?\DateTimeInterface
    {
        return $this->datePublication;
    }

    public function setDatePublication(?\DateTimeInterface $datePublication): static
    {
        $this->datePublication = $datePublication;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): static
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection<int, Commande>
     */
    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commande $commande): static
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes->add($commande);
            $commande->addBookId($this);
        }

        return $this;
    }

    public function removeCommande(Commande $commande): static
    {
        if ($this->commandes->removeElement($commande)) {
            $commande->removeBookId($this);
        }

        return $this;
    }
}
