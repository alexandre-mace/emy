<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Controller\CreateImageAction;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ImageRepository")
 * @ApiResource(attributes={"formats"={"json", "jsonld"}}, iri="http://schema.org/MediaObject", collectionOperations={
 *     "get",
 *     "post"={
 *         "method"="POST",
 *         "path"="/images",
 *         "controller"=CreateImageAction::class,
 *         "defaults"={"_api_receive"=false},
 *     },
 * })
 * @Vich\Uploadable
 */
class Image
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var File|null
     * @Assert\NotNull()
     * @Groups({"food_stuff"})
     * @Vich\UploadableField(mapping="image", fileNameProperty="contentUrl")
     */
    public $file;

    /**
     * @var string|null
     * @ORM\Column(nullable=true)
     * @Groups({"food_stuff"})
     * @ApiProperty(iri="http://schema.org/contentUrl")
     */
    public $contentUrl;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return null|File
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param null|File $file
     */
    public function setFile($file)
    {
        $this->file = $file;
    }

    /**
     * @return null|string
     */
    public function getContentUrl()
    {
        return $this->contentUrl;
    }

    /**
     * @param null|string $contentUrl
     */
    public function setContentUrl($contentUrl)
    {
        $this->contentUrl = $contentUrl;
    }

}
