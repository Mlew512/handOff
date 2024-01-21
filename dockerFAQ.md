Certainly! Below is a cheat sheet with common Docker commands and tasks related to interacting with your containerized application:

### Docker Cheat Sheet

#### Build and Run Containers:

1. **Build and Start Containers:**
   ```bash
   docker-compose up --build
   ```

2. **Stop Containers:**
   ```bash
   docker-compose down
   ```

3. **View Container Logs:**
   ```bash
   docker-compose logs [service_name]
   # Example: docker-compose logs frontend
   ```

4. **Access Container Shell:**
   ```bash
   docker exec -it [container_name_or_id] /bin/sh
   # Example: docker exec -it hand_off-frontend-1 /bin/sh
   ```

#### Database Interaction:

5. **Access PostgreSQL Shell:**
   ```bash
   docker exec -it hand_off-postgres-1 psql -U matt -d handofftest
   ```

#### Docker Image and Volume Management:

6. **List Docker Images:**
   ```bash
   docker images
   ```

7. **Remove Unused Images:**
   ```bash
   docker image prune
   ```

8. **List Docker Volumes:**
   ```bash
   docker volume ls
   ```

9. **Remove Unused Volumes:**
   ```bash
   docker volume prune
   ```

#### Network Management:

10. **List Docker Networks:**
    ```bash
    docker network ls
    ```

11. **Inspect a Docker Network:**
    ```bash
    docker network inspect [network_name]
    # Example: docker network inspect handoff_network
    ```

### Application Access:

12. **Access Frontend:**
    - Local: [http://localhost:5173/](http://localhost:5173/)
    - Docker Network: [http://172.19.0.4:5173/](http://172.19.0.4:5173/)

13. **Access API:**
    - Local: [http://localhost:8000/](http://localhost:8000/)

### Tips:

- If you make changes to your code, restart the containers using `docker-compose down` and `docker-compose up --build`.
- When troubleshooting, check the logs for each service using `docker-compose logs [service_name]`.

Feel free to adjust the commands based on your specific container names, service names, or preferences. If you encounter specific issues or need further assistance, let me know!