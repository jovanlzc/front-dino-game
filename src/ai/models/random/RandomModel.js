import Model from '../Model';

export default class RandomModel extends Model {
  weights = new Array(3);
  biases = new Array(1);

  init() {
    // console.info("i happened");
    this.randomize((data)=>{
      console.log('podaciIzRandomize',data)
      console.log('postavljaZaWeights:',data.slice(0,3))
      console.log('postavljaZaBiases:',data[3])

      this.weights = data.slice(0,3)
      this.biases[0] = data[3]
    })
  }

  predict(inputXs,callback) {
    console.log('pozvana predict funkcija')
    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', 'http://localhost:3000/predict', true)
    request.setRequestHeader('Content-Type', 'application/json')
    console.log('weights',this.weights.concat(this.biases))
    console.log('inputs',inputXs[0])

    request.onload = function () {
      const data = JSON.parse(this.response)
      console.log('dataPredict',data)
      // Begin accessing JSON data here
      return callback(parseInt(data,10))
    }

    // Send request
    request.send(JSON.stringify({
      weights:this.weights.concat(this.biases),
      inputs: inputXs[0]

  }))
    // const inputX = inputXs[0];
    // const y =
    //   this.weights[0] * inputX[0] +
    //   this.weights[1] * inputX[1]+
    //   this.weights[2] * inputX[2] +
    //   this.biases[0];
    // return y < 0 ? 1 : 0;
  }

  train() {
    this.randomize((data)=>{
      console.log('pozvana train metoda')
      console.log('trainWeights:',data.slice(0,3))
      console.log('trainInputs',data[3])
      this.weights = data.slice(0,3)
      this.biases[0] = data[3]
    })
  }

  randomize(callback) {
    const request = new XMLHttpRequest()
    console.log('pozvana randomize funkcija')
    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', 'http://localhost:3000/initiliaze', true)
    request.setRequestHeader('Content-Type', 'application/json')

    request.onload = function () {
      const data = JSON.parse(this.response)
      console.log('data',data)
      // Begin accessing JSON data here
      return callback(data)
    }

    // Send request
    request.send()
    // this.weights[0] = random();
    // this.weights[1] = random();
    // this.weights[2] = random();
    // this.biases[0] = random();
    }

  getChromosome() {
    console.log('weights iz geta:',this.weights)
    console.log('biases iz geta:',this.biases)
    return this.weights.concat(this.biases);
  }

  setChromosome(chromosome) {
    this.weights[0] = chromosome[0];
    this.weights[1] = chromosome[1];
    this.weights[2] = chromosome[2];
    this.biases[0] = chromosome[3];
  }
}

function random() {
  return (Math.random() - 0.5) * 2;
}
