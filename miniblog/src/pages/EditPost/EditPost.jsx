import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // Criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(id, data);

    // Redirect -> Home Page
    navigate("/dashboard");
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Faça a alteração dos dados da publicação</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
              <input type="text"
                name="title"
                required
                placeholder="Insira um título para a sua publicação"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da Imagem: </span>
              <input type="text"
                name="image"
                required
                placeholder="Insira uma imagem que represente a sua publicação"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo: </span>
              <textarea name="body"
                required
                placeholder="Insira o conteúdo da sua publicação"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost