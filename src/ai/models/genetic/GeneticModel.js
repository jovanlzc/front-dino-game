import Model from '../Model';

export default class GeneticModel extends Model {
  train(chromosomes) {
    console.log('podaci pre treniranja',chromosomes)
    const parents = this.select(chromosomes);
    this.crossOver(parents, chromosomes);
    this.mutate(chromosomes)
    console.log('podaci posle treniranja',chromosomes)
  }

  fit(chromosomes) {
    this.train(chromosomes);
  }

  select(chromosomes) {
    const parents = [chromosomes[0], chromosomes[1]];
    return parents;
  }

  crossOver(parents, chromosomes) {
    // Clone from parents
    // console.info(parents)

    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', 'http://localhost:3000/cross-over', true)
    request.setRequestHeader('Content-Type', 'application/json')
    console.log('cross-over',chromosomes)
    request.onload = function () {
      const data = JSON.parse(this.response)
      // Begin accessing JSON data here
    console.log('cross:stigli podaci:',data)
    chromosomes = data;
    }

    // Send request
    request.send(JSON.stringify({
      chromo:chromosomes
    }))

  }

  mutate(chromosomes) {
    // chromosomes.forEach(chromosome => {
    //   const mutationPoint = Math.floor(Math.random(chromosomes.length));
    //   chromosome[mutationPoint] = (Math.random()-0.5)*2;
    // });

    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', 'http://localhost:3000/mutate', true)
    request.setRequestHeader('Content-Type', 'application/json')
    console.log('mutate:poziv-hromozomi',chromosomes)
    request.onload = function () {
      const data = JSON.parse(this.response)
      // Begin accessing JSON data here
    console.log('mutate:stigli podaci:',data)
    chromosomes = data;
    }

    // Send request
    request.send(JSON.stringify({
      chromo:chromosomes
    }))
  }
}

