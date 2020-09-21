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
    console.log('mutate:stigli podaci:',data)
    chromosomes = data;
    }

    // Send request
    request.send(JSON.stringify({
      chromo:chromosomes
    }))

    const offspring1 = parents[0];
    const offspring2 = parents[1];
    console.info("off1:",offspring1);
    console.info("off2:",offspring2);
    // Select a random crossover point
    const crossOverPoint = Math.floor(Math.random() * offspring1.length);
    console.info("cross here: ",crossOverPoint);
    // Swap values among parents
    for (let i = 0; i < crossOverPoint; i += 1) {
        const temp = offspring1[i];
        offspring1[i] = offspring2[i];
        offspring2[i] = temp;
    }
    const offspring = [offspring1, offspring2];
    // Replace the last 2 with the new offspring
    for (let i = 0; i < 2; i += 1) {
      chromosomes[chromosomes.length - i - 1] = offspring[i];
    }
    console.info("child: ",offspring)
    return offspring;
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

