package tvdigital.service;


import tvdigital.model.Cliente;
import tvdigital.repository.ClienteRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;



@Service
public class ClienteService {


    private final ClienteRepository clienteRepository;


    public ClienteService(ClienteRepository clienteRepository) {

        this.clienteRepository = clienteRepository;

    }



    // Listar todos los clientes
    public List<Cliente> listarClientes(){

        return clienteRepository.findAll();

    }




    // Crear cliente y generar vencimiento automático
    public Cliente guardarCliente(Cliente cliente){


        if(cliente.getFechaPago()!=null){

            cliente.setFechaVencimiento(
                    cliente.getFechaPago().plusMonths(1)
            );

        }


        cliente.setActivo(true);


        return clienteRepository.save(cliente);

    }






    // Buscar cliente por ID
    public Optional<Cliente> buscarPorId(Long id){

        return clienteRepository.findById(id);

    }






    // Eliminar cliente
    public void eliminarCliente(Long id){

        clienteRepository.deleteById(id);

    }







    // Renovar cliente
    public Cliente renovarCliente(Long id){


        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));



        cliente.setFechaVencimiento(
                cliente.getFechaVencimiento().plusMonths(1)
        );


        cliente.setActivo(true);


        return clienteRepository.save(cliente);

    }







    // 🟢 ACTIVOS
    // Incluye los próximos a vencer mientras sigan vigentes

    public List<Cliente> clientesActivos(){

        LocalDate hoy = LocalDate.now();


        return clienteRepository.findAll()
                .stream()
                .filter(c -> c.getFechaVencimiento()!=null)
                .filter(c -> !c.getFechaVencimiento().isBefore(hoy))
                .toList();

    }








    // 🟡 PRÓXIMOS A VENCER
    // Clientes que vencen dentro de los próximos 3 días
    // Siguen apareciendo también en activos

    public List<Cliente> clientesPorVencer(){

        LocalDate hoy = LocalDate.now();


        return clienteRepository.findAll()
                .stream()
                .filter(c -> c.getFechaVencimiento()!=null)
                .filter(c -> !c.getFechaVencimiento().isBefore(hoy))
                .filter(c -> !c.getFechaVencimiento().isAfter(hoy.plusDays(3)))
                .toList();

    }







    // 🔴 VENCIDOS
    // Ya pasó la fecha de vencimiento

    public List<Cliente> clientesVencidos(){

        LocalDate hoy = LocalDate.now();


        return clienteRepository.findAll()
                .stream()
                .filter(c -> c.getFechaVencimiento()!=null)
                .filter(c -> c.getFechaVencimiento().isBefore(hoy))
                .toList();

    }



}