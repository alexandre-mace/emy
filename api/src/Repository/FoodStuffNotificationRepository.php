<?php

namespace App\Repository;

use App\Entity\FoodStuffNotification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method FoodStuffNotification|null find($id, $lockMode = null, $lockVersion = null)
 * @method FoodStuffNotification|null findOneBy(array $criteria, array $orderBy = null)
 * @method FoodStuffNotification[]    findAll()
 * @method FoodStuffNotification[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FoodStuffNotificationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, FoodStuffNotification::class);
    }

    // /**
    //  * @return FoodStuffNotification[] Returns an array of FoodStuffNotification objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FoodStuffNotification
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
