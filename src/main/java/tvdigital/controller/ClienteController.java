package tvdigital.controller;

import tvdigital.model.Cliente;
import tvdigital.service.ClienteService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {


    private final ClienteService clienteService;


    public ClienteController(ClienteService clienteService) {

        this.clienteService = clienteService;

    }



    @GetMapping("/activos")
    public List<Cliente> activos() {

        return clienteService.clientesActivos();

    }



    @GetMapping("/proximos")
    public List<Cliente> proximos() {

        return clienteService.clientesPorVencer();

    }



    @GetMapping("/vencidos")
    public List<Cliente> vencidos() {

        return clienteService.clientesVencidos();

    }





    @GetMapping
    public List<Cliente> listar() {

        return clienteService.listarClientes();

    }





    @PostMapping
    public Cliente crear(@RequestBody Cliente cliente) {

        return clienteService.guardarCliente(cliente);

    }





    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {

        return clienteService.buscarPorId(id)
                .orElse(null);

    }





    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {

        clienteService.eliminarCliente(id);

        return "Cliente eliminado correctamente";

    }





    @PutMapping("/{id}/renovar")
    public Cliente renovar(@PathVariable Long id) {

        return clienteService.renovarCliente(id);

    }


}