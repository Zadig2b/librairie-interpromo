<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240827071440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commande (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, statut VARCHAR(255) NOT NULL, INDEX IDX_6EEAA67D9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande_livre (commande_id INT NOT NULL, livre_id INT NOT NULL, INDEX IDX_950B905A82EA2E54 (commande_id), INDEX IDX_950B905A37D925CB (livre_id), PRIMARY KEY(commande_id, livre_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67D9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE commande_livre ADD CONSTRAINT FK_950B905A82EA2E54 FOREIGN KEY (commande_id) REFERENCES commande (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE commande_livre ADD CONSTRAINT FK_950B905A37D925CB FOREIGN KEY (livre_id) REFERENCES livre (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categorie ADD description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE livre ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67D9D86650F');
        $this->addSql('ALTER TABLE commande_livre DROP FOREIGN KEY FK_950B905A82EA2E54');
        $this->addSql('ALTER TABLE commande_livre DROP FOREIGN KEY FK_950B905A37D925CB');
        $this->addSql('DROP TABLE commande');
        $this->addSql('DROP TABLE commande_livre');
        $this->addSql('ALTER TABLE categorie DROP description');
        $this->addSql('ALTER TABLE livre DROP created_at');
    }
}
