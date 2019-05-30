<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={
 *         "formats"={"jsonld"},
 *         "normalization_context"={"groups"={"offer", "offer:read"}},
 *         "denormalizationContext"={"groups"={"offer", "offer:write"}}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\FoodStuffOfferRepository")
 * @ApiFilter(SearchFilter::class, properties={"askingUser": "exact", "owner": "exact", "status": "exact"})
 * @ApiFilter(BooleanFilter::class, properties={"hasBeenSeen"})
 */
class FoodStuffOffer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FoodStuff", inversedBy="foodStuffOffers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"offer:read"})
     */
    private $foodstuff;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="foodStuffOffers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"offer:read"})
     */
    private $askingUser;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"offer:read"})
     */
    private $status;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     * @Groups({"offer:read"})
     */
    private $hasBeenSeen = false;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="owningFoodstuffOffers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"offer:read"})
     */
    private $owner;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFoodstuff(): ?FoodStuff
    {
        return $this->foodstuff;
    }

    public function setFoodstuff(?FoodStuff $foodstuff): self
    {
        $this->foodstuff = $foodstuff;

        return $this;
    }

    public function getAskingUser(): ?User
    {
        return $this->askingUser;
    }

    public function setAskingUser(?User $askingUser): self
    {
        $this->askingUser = $askingUser;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getHasBeenSeen(): ?bool
    {
        return $this->hasBeenSeen;
    }

    public function setHasBeenSeen(bool $hasBeenSeen): self
    {
        $this->hasBeenSeen = $hasBeenSeen;

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
}
