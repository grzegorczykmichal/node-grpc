const greets = require("./proto/greet_pb");
const greetService = require("./proto/greet_grpc_pb");

const calc = require("../server/proto/calculator_pb");
const calcService = require("../server/proto/calculator_grpc_pb");

const grpc = require("grpc");

function main() {
  const server = new grpc.Server();

  server.addService(greetService.GreetServiceService, {
    greet: (call, callback) => {
      const greeting = new greets.GreetResponse();
      greeting.setResult(
        `Hello ${call.request
          .getGreeting()
          .getFirstname()} ${call.request.getGreeting().getLastname()}`
      );
      callback(null, greeting);
    }
  });

  server.addService(calcService.SumServiceService, {
    sum: (call, callback) => {
      const sum = new calc.SumResponse();
      sum.setResult(call.request.getA() + call.request.getB());
      callback(null, sum);
    }
  });

  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(
    "Server running on \x1b[;34m127.0.0.1\x1b[0m:\u001b[0;33m50051\x1b[0m"
  );
}

main();
