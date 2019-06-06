<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource
 * @ORM\Table(name="app_user")
 * @ApiFilter(SearchFilter::class, properties={"email": "exact"})
 * @ApiFilter(OrderFilter::class, properties={"points"}, arguments={"orderParameterName"="order"})
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"food_stuff:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"food_stuff:read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FoodStuff", mappedBy="provider")
     */
    private $foodStuffsProvided;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FoodStuff", mappedBy="owner")
     */
    private $foodStuffsOwned;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"food_stuff:read", "offer:read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="integer", options={"default": 0})
     */
    private $points = 0;

    /**
     * @ORM\Column(type="string", length=255, options={"default": "iron"})
     */
    private $grade = 'bronze';

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FoodStuffOffer", mappedBy="askingUser", orphanRemoval=true)
     */
    private $foodStuffOffers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FoodStuffOffer", mappedBy="owner", orphanRemoval=true)
     */
    private $owningFoodstuffOffers;

    public function __construct()
    {
        $this->foodStuffs = new ArrayCollection();
        $this->foodStuffOffers = new ArrayCollection();
        $this->owningFoodstuffOffers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|FoodStuff[]
     */
    public function getFoodStuffsProvided()
    {
        return $this->foodStuffsProvided;
    }

    public function addFoodStuffProvided(FoodStuff $foodStuff): self
    {
        if (!$this->foodStuffsProvided->contains($foodStuff)) {
            $this->foodStuffsProvided[] = $foodStuff;
            $foodStuff->setProvider($this);
        }

        return $this;
    }

    public function removeFoodStuffProvided(FoodStuff $foodStuff): self
    {
        if ($this->foodStuffsProvided->contains($foodStuff)) {
            $this->foodStuffsProvided->removeElement($foodStuff);
            // set the owning side to null (unless already changed)
            if ($foodStuff->getProvider() === $this) {
                $foodStuff->setProvider(null);
            }
        }

        return $this;
    }
    /**
     * @return Collection|FoodStuff[]
     */
    public function getFoodStuffsOwned()
    {
        return $this->foodStuffsOwned;
    }

    public function addFoodStuffOwned(FoodStuff $foodStuff): self
    {
        if (!$this->foodStuffsOwned->contains($foodStuff)) {
            $this->foodStuffsOwned[] = $foodStuff;
            $foodStuff->setOwner($this);
        }

        return $this;
    }

    public function removeFoodStuffOwned(FoodStuff $foodStuff): self
    {
        if ($this->foodStuffsOwned->contains($foodStuff)) {
            $this->foodStuffsOwned->removeElement($foodStuff);
            // set the owning side to null (unless already changed)
            if ($foodStuff->getOwner() === $this) {
                $foodStuff->setOwner(null);
            }
        }

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): self
    {
        $this->points = $points;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(string $grade): self
    {
        $this->grade = $grade;

        return $this;
    }

    /**
     * @return Collection|FoodStuffOffer[]
     */
    public function getFoodStuffOffers(): Collection
    {
        return $this->foodStuffOffers;
    }

    public function addFoodStuffOffer(FoodStuffOffer $foodStuffOffer): self
    {
        if (!$this->foodStuffOffers->contains($foodStuffOffer)) {
            $this->foodStuffOffers[] = $foodStuffOffer;
            $foodStuffOffer->setAskingUser($this);
        }

        return $this;
    }

    public function removeFoodStuffOffer(FoodStuffOffer $foodStuffOffer): self
    {
        if ($this->foodStuffOffers->contains($foodStuffOffer)) {
            $this->foodStuffOffers->removeElement($foodStuffOffer);
            // set the owning side to null (unless already changed)
            if ($foodStuffOffer->getAskingUser() === $this) {
                $foodStuffOffer->setAskingUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|FoodStuffOffer[]
     */
    public function getOwningFoodstuffOffers(): Collection
    {
        return $this->owningFoodstuffOffers;
    }

    public function addOwningFoodstuffOffer(FoodStuffOffer $owningFoodstuffOffer): self
    {
        if (!$this->owningFoodstuffOffers->contains($owningFoodstuffOffer)) {
            $this->owningFoodstuffOffers[] = $owningFoodstuffOffer;
            $owningFoodstuffOffer->setOwner($this);
        }

        return $this;
    }

    public function removeOwningFoodstuffOffer(FoodStuffOffer $owningFoodstuffOffer): self
    {
        if ($this->owningFoodstuffOffers->contains($owningFoodstuffOffer)) {
            $this->owningFoodstuffOffers->removeElement($owningFoodstuffOffer);
            // set the owning side to null (unless already changed)
            if ($owningFoodstuffOffer->getOwner() === $this) {
                $owningFoodstuffOffer->setOwner(null);
            }
        }

        return $this;
    }
}
