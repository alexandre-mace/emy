<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(attributes={
 *     "formats"={"jsonld"},
 *     "normalization_context"={"groups"={"food_stuff", "food_stuff:read"}},
 *     "denormalizationContext"={"groups"={"food_stuff", "food_stuff:write"}}})
 * @ORM\Entity(repositoryClass="App\Repository\FoodStuffRepository")
 * @ApiFilter(SearchFilter::class, properties={"provider": "exact", "owner": "exact", "askingToOwn": "exact"})
 * @ApiFilter(BooleanFilter::class, properties={"isAwaiting", "hasBeenGiven"})
 */
class FoodStuff
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"food_stuff:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"food_stuff"})
     */
    private $name;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotNull
     * @Groups({"food_stuff"})
     */
    private $expirationDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"food_stuff"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"food_stuff"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"food_stuff"})
     */
    private $availabilities = '';

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Image", cascade={"persist", "remove"})
     * @Groups({"food_stuff"})
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="foodStuffsProvided")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"food_stuff"})
     */
    private $provider;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="foodStuffsOwned")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"food_stuff"})
     */
    private $owner;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"food_stuff:read"})
     */
    private $isAwaiting = false;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"food_stuff:read"})
     */
    private $hasBeenGiven = false;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="askingToOwnFoodstuffs")
     * @Groups({"food_stuff:read"})
     */
    private $askingToOwn = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getExpirationDate()
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(\DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getAvailabilities(): ?string
    {
        return $this->availabilities;
    }

    public function setAvailabilities(string $availabilities): self
    {
        $this->availabilities = $availabilities;

        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getProvider(): ?User
    {
        return $this->provider;
    }

    public function setProvider(?User $provider): self
    {
        $this->provider = $provider;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getIsAwaiting(): ?bool
    {
        return $this->isAwaiting;
    }

    public function setIsAwaiting(bool $isAwaiting): self
    {
        $this->isAwaiting = $isAwaiting;

        return $this;
    }

    public function getHasBeenGiven(): ?bool
    {
        return $this->hasBeenGiven;
    }

    public function setHasBeenGiven(bool $hasBeenGiven): self
    {
        $this->hasBeenGiven = $hasBeenGiven;

        return $this;
    }

    public function getAskingToOwn(): ?User
    {
        return $this->askingToOwn;
    }

    public function setAskingToOwn(?User $askingToOwn): self
    {
        $this->askingToOwn = $askingToOwn;

        return $this;
    }
}
