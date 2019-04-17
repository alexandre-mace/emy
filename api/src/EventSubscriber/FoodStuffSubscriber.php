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
//            'prePersist',
//            'preUpdate'
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $this->assign($args);
    }

    public function assign(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof FoodStuff) {
            return;
        }

        $user = $this->security->getUser();

        if ($user instanceof User) {
            $entity->setProvider($user);
            $entity->setOwner($user);
        }
    }
}