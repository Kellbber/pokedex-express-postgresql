const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


const pokedex = [
  {
    id: 1,
    numero: 144,
    nome: "Articuno",
    descricao:
      "Dizem que as belas asas azuis deste Pokémon são feitas de gelo. Articuno voa sobre montanhas nevadas, sua longa cauda esvoaçando atrás dele.",
    tipo: "Ice | Flying",
    altura: "1.7",
    peso: "54.4",
    categoria: "Freeze",
    habilidade: "Pressure",
    fraquezas: "Steel | Fire | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png",
  },
  {
    id: 2,
    numero: 145,
    nome: "Zapdos",
    descricao:
      "Este Pokémon tem controle total sobre a eletricidade. Há histórias de Zapdos aninhando-se nas profundezas escuras de nuvens negras como breu.",
    tipo: "Electric | Flying",
    altura: "1.6",
    peso: "52.6",
    categoria: "Electric",
    habilidade: "Pressure",
    fraquezas: "Ice | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png",
  },
  {
    id: 3,
    numero: 146,
    nome: "Moltres",
    descricao:
      "É um dos Pokémon pássaros lendários. Quando Moltres bate suas asas flamejantes, elas brilham com um brilho vermelho deslumbrante.",
    tipo: "Fire | Flying",
    altura: "2.0",
    peso: "60.0",
    categoria: "Flame",
    habilidade: "Pressure",
    fraquezas: "Water | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png",
  },
  {
    id: 4,
    numero: 250,
    nome: "Ho-Oh",
    descricao:
      "As penas de Ho-Oh brilham em sete cores, dependendo do ângulo em que são atingidas pela luz. Dizem que essas penas trazem felicidade aos portadores. Dizem que este Pokémon vive ao pé de um arco-íris.",
    tipo: "Fire | Flying",
    altura: "3.8",
    peso: "199.0",
    categoria: "Rainbow",
    habilidade: "Pressure",
    fraquezas: "Water | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/250.png",
  },
];
let pokemon = undefined;
let nextId = 5;
let message = "";

//rotas

app.get("/", (req, res) => {

  res.render("index", {message, pokedex, pokemon});

});

app.get("/curiosidade", (req, res) => {
  res.render("curiosidade");
});

app.post("/formulario", (req, res) => {
  pokemon = req.body;
  pokemon.id = nextId;
  nextId++
  pokedex.push(pokemon);
  pokemon = undefined;
  message = `Seu Pokémon foi criado com sucesso!`;
  setTimeout(() => {
    message = "";
  }, 1000);
  res.redirect("/#cards");
});

app.get("/cadastro/(:id)?", (req, res) => {
  if(!isNaN(+req.params.id)){
  const idPokemon = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id == idPokemon);
  res.render("cadastro", {Pokemon: pokemon, Pokedex: pokedex});
  }else{
  res.render("cadastro", {Pokemon: pokemon, Pokedex: pokedex});
  }

});

app.get("/detalhes/:id", (req, res) => {
  const index = req.params.id;
  const pokemons = pokedex[index];
  res.render("detalhes", { pokemon: pokemons });
});

app.post("/atualizar/:id", (req, res) => {
  const index = +req.params.id;
  const newPokemon = req.body;
  newPokemon.id = pokedex[index].id;
  pokedex[index] = newPokemon;
  pokemon = undefined;
  message = `Seu Pokémon foi atualizado com sucesso!`;
  setTimeout(() => {
    message = "";
  }, 1000);
  res.redirect("/#cards");
});

app.get("/deletar/:id", (req, res) => {
  const index = +req.params.id;
  pokedex.splice(index, 1)
  message='';
  message = `Seu Pokémon foi deletado com sucesso!`;
  setTimeout(() => {
    message = "";
  }, 1000);
  console.log(pokedex)
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`servidor rodando em: http://localhost:${port}`)
);