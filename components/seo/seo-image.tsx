import Image from 'next/image';

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  caption?: string;
  credit?: string;
  sizes?: string;
}

export default function SEOImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  caption,
  credit,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SEOImageProps) {
  const imageId = `image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': imageId,
    url: src,
    width: width,
    height: height,
    description: alt,
    ...(caption && { caption }),
    ...(credit && { 
      creator: {
        '@type': 'Person',
        name: credit,
      }
    }),
  };

  return (
    <figure className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="w-full h-auto"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-gray-600">
          {caption && <span className="block">{caption}</span>}
          {credit && <span className="block text-xs">Credit: {credit}</span>}
        </figcaption>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </figure>
  );
} 