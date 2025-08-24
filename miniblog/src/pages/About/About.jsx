import styles from "./About.module.css";

import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
        <h1>Sobre o Mini <span>Blog</span></h1>
        <p>Este projeto foi criado através de estudos em um curso e consiste em um blog feito com React no front-end e Firebase no back-end</p>
        <Link to="/posts/create" className="btn">
          Criar Post
        </Link>
    </div>
  )
}

export default About