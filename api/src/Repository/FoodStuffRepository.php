<?php

namespace App\Repository;

use App\Entity\FoodStuff;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method FoodStuff|null find($id, $lockMode = null, $lockVersion = null)
 * @method FoodStuff|null findOneBy(array $criteria, array $orderBy = null)
 * @method FoodStuff[]    findAll()
 * @method FoodStuff[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FoodStuffRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, FoodStuff::class);
    }

    // /**
    //  * @return FoodStuff[] Returns an array of FoodStuff objects
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
    public function findOneBySomeField($value): ?FoodStuff
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
