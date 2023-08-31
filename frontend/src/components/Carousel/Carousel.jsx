import React, { useEffect, useState } from 'react';
import styles from './Carousel.module.css';


function Carousel() {

  const images = [
    "https://i.ibb.co/0nXN3vc/carousel-img1.jpg",
    "https://i.ibb.co/3Rk3C5t/carousel-img2.jpg",
    "https://i.ibb.co/1bN0FH6/confianza.jpg",
    "https://i.ibb.co/YtDPhp2/banner-gaming-1img.jpg",
  ]
  const [img, setImg] = useState(0)

  function next() {
    if (img < images.length - 1) setImg(img + 1)
    else setImg(0)
  }

  function back() {
    if (img > 0) setImg(img - 1)
    else setImg(images.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 6000)
    return () => clearTimeout(time)
  }, [img])

  return (
    <div>
      <div className={styles.slideshowContainer}>

        <img key={img} src={images[img]} className={`${styles.img} ${styles.fade}`} />

        <a className={styles.prev} onClick={back}>&#10094;</a>
        <a className={styles.next} onClick={next}>&#10095;</a>
        <div className={styles.dotContainer}>
          {images.length ?
            images.map((e, k) =>
              <span key={k + 1} className={img !== k ? styles.dot : styles.activeDot} onClick={() => setImg(k)}></span>
            )
            :
            <p>Image not found</p>
          }
        </div>
      </div>


    </div>
  )
}

export default Carousel;