<?php

namespace App\Repository;

use App\Entity\FoodStuffOffer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method FoodStuffOffer|null find($id, $lockMode = null, $lockVersion = null)
 * @method FoodStuffOffer|null findOneBy(array $criteria, array $orderBy = null)
 * @method FoodStuffOffer[]    findAll()
 * @method FoodStuffOffer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FoodStuffOfferRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, FoodStuffOffer::class);
    }

    // /**
    //  * @return FoodStuffOffer[] Returns an array of FoodStuffOffer objects
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
    public function findOneBySomeField($value): ?FoodStuffOffer
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
