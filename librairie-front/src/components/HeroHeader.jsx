"use client"
import Image from 'next/image';

export default function HeroHeader() {
  return (
    <div 
      className="heroHeader d-none d-md-block" 
      style={{ height: '500px', width: '100%', position: 'relative', overflow: 'hidden' }}
    >
<Image
  src="/asset/Images/slide.jpeg" 
  alt="Library Image"
  fill
  style={{ objectFit: "cover" }} // Recadre l'image pour l'adapter au conteneur
  className="me-2"
  priority
/>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          color: '#FFFFFF', 
          fontSize: '5rem', 
          fontWeight: 'regular',
          padding: '0 1rem', // Remplissage pour garantir que le texte n'est pas tronqué
          zIndex: 1 // Garantit que le texte est au-dessus de l'image
        }}
      >
        Bienvenue à la plume <br />des Ecrins
      </div>
    </div>
  );
}
