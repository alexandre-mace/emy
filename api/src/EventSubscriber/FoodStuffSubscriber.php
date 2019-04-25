<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 17/04/19
 * Time: 16:39
 */

namespace App\EventSubscriber;


use App\Entity\FoodStuff;
use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class FoodStuffSubscriber implements EventSubscriber
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
            'preUpdate'
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $this->adjustNewRank($args);
    }

    public function preUpdate(LifecycleEventArgs $args)
    {
        $this->adjustNewRank($args);
    }

    public function adjustNewRank(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof FoodStuff) {
            return;
        }

        $user = $entity->getProvider();

        if ($user instanceof User) {
            $user->setPoints($user->getPoints() + 10);
            if ($user->getPoints() >= 30) {
                if ($user->getPoints() >= 200) {
                    $user->setGrade('platine');
                    return;
                }
                if ($user->getPoints() >= 100) {
                    $user->setGrade('or');
                    return;
                }
                $user->setGrade('argent');
            }
        }
    }
}