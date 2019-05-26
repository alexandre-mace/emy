<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\FoodStuffNotificationRepository")
 * @ApiFilter(SearchFilter::class, properties={"notifiedUser": "exact"})
 * @ApiFilter(BooleanFilter::class, properties={"hasBeenSeen"})
 */
class FoodStuffNotification
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="foodStuffNotifications")
     * @ORM\JoinColumn(nullable=false)
     */
    private $notifiedUser;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FoodStuff", inversedBy="foodStuffNotifications")
     * @ORM\JoinColumn(nullable=false)
     */
    private $foodstuff;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"food_stuff:read"})
     */
    private $hasBeenSeen;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNotifiedUser(): ?User
    {
        return $this->notifiedUser;
    }

    public function setNotifiedUser(?User $notifiedUser): self
    {
        $this->notifiedUser = $notifiedUser;

        return $this;
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

    public function getHasBeenSeen(): ?bool
    {
        return $this->hasBeenSeen;
    }

    public function setHasBeenSeen(bool $hasBeenSeen): self
    {
        $this->hasBeenSeen = $hasBeenSeen;

        return $this;
    }
}
