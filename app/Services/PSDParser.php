<?php

namespace BannersCreator\Services;

use DirectoryHelper;
use File;
use Imagick;

class PSDParser
{
    const PSD_EXTENSION = 'psd';
    const IMAGE_EXTENSION = 'png';
    const LOGO_LAYER_NAME = 'logo';

    /**
     * Path for processed image, relative to `/public` directory
     */
    const PROCESSED_IMAGES_PATH = '/processed-images';

    /**
     * Converted images data
     *
     * @var array[0]
     *          array[
     *              ['imageName']
     *              ['imagePath']
     *              ['imageExtension']
     *              ['hasLogo']
     *          ]
     */
    private $convertedImagesData = [];

    /**
     * @var \Symfony\Component\HttpFoundation\File\UploadedFile|array|null
     */
    private $files;

    /**
     * @var string
     */
    private $sourcePath;

    /**
     * @var string
     */
    private $destinationPath;

    /**
     * PSDParser constructor.
     * @param $files
     * @param $sourcePath
     */
    public function __construct($files, $sourcePath)
    {
        $this->files = $files;

        $this->sourcePath = $sourcePath;
        $this->destinationPath = public_path() . PSDParser::PROCESSED_IMAGES_PATH;
    }

    /**
     * @return array
     */
    public function getConvertedImagesData()
    {
        return $this->convertedImagesData;
    }

    /**
     *  Start parsing of PSD files
     */
    public function parse()
    {
        File::cleanDirectory($this->destinationPath);

        DirectoryHelper::makeDirectory($this->destinationPath);

        foreach ($this->files as $file)
        {
            if ($file->getClientOriginalExtension() !== PSDParser::PSD_EXTENSION)
            {
                continue;
            }

            $this->convertPSDFile($file);
        }
    }

    /**
     * Converting of a single PSD file to jpg.
     * Converting splits into two stages:
     *  - finding and converting logo into separate image;
     *  - converting all layers into another image;
     *
     * @param $file
     */
    private function convertPSDFile($file) {
        $imageName = $this->getOutputImageName($file);
        $outputImageDirectory = $this->getOutputImageDirectory($imageName);

        $logoLayerIndex = null;
        $hasLogoLayer = $this->hasLogoLayer($file, $logoLayerIndex);

        if ($hasLogoLayer) {
            $this->saveImage(
                $this->getPSDLogoLayer($file, $logoLayerIndex),
                $outputImageDirectory,
                PSDParser::LOGO_LAYER_NAME
            );
        }

        $this->saveImage(
            $this->getFullPSD($file),
            $outputImageDirectory,
            $imageName
        );

        $this->convertedImagesData[] = [
            'imagePath' => $this->getOutputPublicImageDirectory($imageName),
            'imageName' => $imageName,
            'imageExtension' => PSDParser::IMAGE_EXTENSION,
            'hasLogo' => $hasLogoLayer,
        ];
    }

    /**
     * Return output directory in which image will saved
     *
     * @param $imageName
     * @return string
     */
    private function getOutputImageDirectory($imageName)
    {
        return $this->destinationPath . '/' . $imageName;
    }

    /**
     * Return output image directory, relative to `/public` folder
     *
     * @param $imageName
     * @return string
     */
    private function getOutputPublicImageDirectory($imageName)
    {
        return PSDParser::PROCESSED_IMAGES_PATH . '/' . $imageName;
    }

    /**
     * Return output image name based on PSD name with image extension
     *
     * @param $file
     * @return string
     */
    private function getOutputImageName($file) {
        return pathinfo($file->getClientOriginalName())['filename'];
    }

    /**
     * Return Imagick object with logo layer
     *
     * @param $file
     * @param $logoLayerIndex
     * @return Imagick
     */
    private function getPSDLogoLayer($file, $logoLayerIndex)
    {
        $inputImage = new Imagick($this->sourcePath . $file->getClientOriginalName());
        $outputImage = new Imagick();

        $inputImage->setIteratorIndex($logoLayerIndex);
        $outputImage->addImage($inputImage->getimage());

        $layerData = $outputImage->getImagePage();
        $outputImage->setImagePage($layerData['width'], $layerData['height'], 0, 0);

        return $outputImage;
    }

    /**
     * Return copy of initial Imagick object with all layers
     *
     * @param $file
     * @return Imagick
     */
    private function getFullPSD($file)
    {
        $inputImage = new Imagick($this->sourcePath . $file->getClientOriginalName());
        $outputImage = clone $inputImage;

        return $outputImage;
    }

    /**
     * Check if logo layer exist in $file
     * Put logo layer index into $logoLayerIndex
     *
     * @param $file
     * @param null $logoLayerIndex
     * @return bool
     */
    private function hasLogoLayer($file, &$logoLayerIndex = null)
    {
        $inputImage = new Imagick($this->sourcePath . $file->getClientOriginalName());

        $layersCount = $inputImage->getNumberImages();

        for ($i = 0; $i < $layersCount; $i++) {
            $inputImage->setIteratorIndex($i);

            $imageLabelProperty = $inputImage->getImageProperties("label");

            if (!count($imageLabelProperty)) {
                continue;
            }

            $imageLabel = $imageLabelProperty['label'];

            if (stristr($imageLabel, PSDParser::LOGO_LAYER_NAME) === false) {
                continue;
            }

            $logoLayerIndex = $i;

            return true;
        }

        return false;
    }

    /**
     * Save Imagick $outputImage with $imageName into $outputDirectory
     *
     * @param Imagick $outputImage
     * @param $outputDirectory
     * @param $imageName
     */
    private function saveImage(Imagick $outputImage, $outputDirectory, $imageName)
    {
        if (!$outputImage->count()) {
            return;
        }

        DirectoryHelper::makeDirectory($outputDirectory);

        $outputImage->setImageFormat(PSDParser::IMAGE_EXTENSION);
        $outputImage->writeImage($outputDirectory . '/' . $imageName . '.' . PSDParser::IMAGE_EXTENSION);
    }
}
