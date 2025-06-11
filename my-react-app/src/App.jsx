import {useState, useEffect} from 'react'
import './App.css'


function App() {
  //Logica de programación (JavaScript).
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //useEffect para manejar efectos secundarios, como la carga de datos.
  //Carga de datos desde una API
  useEffect(() => {
      //Funcion asíncrona para obtener datos de la API
      //Se utiliza fetch para realizar la petición HTTP
      //Se maneja la respuesta y se actualiza el estado del componente(try/catch para manejar errores)
      const getDogs = async () => {
        try {
          const response = await fetch('https://api.thedogapi.com/v1/breeds');
          if (!response.ok) {throw new Error(`Error: ${response.status} ${response.statusText}`);}
          const data = await response.json();
          //Actualizamos el estado con los datos obtenidos
          setDogs(data);
          //Ver datos en la consola
          console.log(data);
          
        } catch (error) {
          setError(error.message);
        }
        finally {
          setLoading(false);
        }
      }

      getDogs();

  },[]);

  //Renderizado condicional basado en el estado de la app 
  if(loading){return <p>Loading...</p>}
  if(error){return <p>Error: {error.message}</p>}

  return (
    //Estructura HTML de la aplicación
    //Utilizamos fragmentos para no crear un nodo extra en el DOM

    //1- Usar el useState para manejar el estado del componente
    
    <>
        <div className="card-container">
          {dogs.map((race) => (
            <div className="dogs-card" key={race.id}>
              <h2>{race.name}</h2>
              <h3>{race.type}</h3>
              <p><strong>Temperament:</strong> {race.temperament ?? "Not Specified"}</p>
              <p><strong>Origin:</strong> {race.origin ?? "Not Specified"}</p>
            </div>
          ))}
        </div>
    </>
  )
}

export default App
