import Carrusel from "./Carrusel"

function Home () {
    
    // const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=63410bba6451483dbca3143c716f3566'
    // const [recetas, setRecetas] = useState([])
    
    
    
    const objeto = {
        
        
        "results":[
            
        {
            "title": "Receta 1",
           "img": "esto es una imagen",
            "descripcion": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            
        },
        {
           "title": "Receta 3",
           "img": "esto es una imagen",
           "descripcion": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            
        },
        {
            "title": "Receta 2",
            "img": "esto es una imagen",
            "descripcion ": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            
        },
        {
            "title": "Receta 4",
            "img": "esto es una imagen",
            "descripcion": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            
        }]
    }
    
    const objetoMapeado = [{...objeto.results }]

    
    console.log(objetoMapeado)
    
    // axios.get(url)
    // .then(res =>{
    //     console.log(res)
    //     setRecetas(res.data.result)
    // })
    // .catch(err =>{
    //     console.log(err)
    // })
    

    
    return (
        <div>
           <Carrusel/>
            {/* {
                objetoMapeado.map((item,key)=>{
                    <>
                    <h2>{item.title}</h2>
                    <p>{item.descripcion}</p>
                    </>
                })
            } */}
            
            
            
        </div>
    )
}
 
 export default Home