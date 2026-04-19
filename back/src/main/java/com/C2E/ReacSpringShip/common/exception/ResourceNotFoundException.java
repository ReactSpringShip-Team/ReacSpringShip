package com.C2E.ReacSpringShip.common.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Object id) {
        super(resource + " con id '" + id + "' no encontrado");
    }
}
