## Deployment Instructions

⚠️**WARNING** 

**The code in this project is not _yet_ functional so the below instructions won't work.**

This README is an example of how to deploy it given it's completion.

**Prerequisites:**

* **Docker:** Ensure you have Docker installed on your system. You can download it from <https://www.docker.com/get-started>.

* **Docker Compose:** Docker Compose is usually included with Docker Desktop. If you installed Docker Desktop, you should have Docker Compose. You can also install it separately if needed. Check the Docker documentation for installation instructions: <https://docs.docker.com/compose/install/>

**Steps:**

1.  **Navigate to the Directory:** Once you've cloned the repo, open a terminal or command prompt and navigate to the react-python-postgres directory.

    ```
    cd react-python-postgres
    ```

2.  **Start the Application:** Run the following command to start all the services defined in the `docker-compose.yml` file:

    ```
    docker compose up -d
    ```

    * `-d` flag: Runs the containers in detached mode (in the background). If you don't use the `-d` flag, you'll see the logs in your terminal, and you'll need to keep the terminal window open.

3.  **Verify the Services:** After the containers have started, you can check their status using the following command:

    ```
    docker compose ps
    ```

    This will show you a list of the running containers and their status. You should see your `db`, `backend`, and `frontend` services listed.

4.  **Access the Application:**

    * **Frontend:** Open your web browser and go to `http://localhost:3000`. You should see your React application running.

    * **Backend:** The backend API should be accessible at `http://localhost:8000`. You can test it using a tool like `curl` or Postman, or by interacting with the frontend.

    * **Database:** The Postgres database is running on `localhost:5432`. You can connect to it using a database client (e.g., `psql`, pgAdmin) if needed. Note that the database is usually accessed by the backend service, not directly by the user.

**Stopping the Application:**

To stop all the services, run the following command:

```
docker compose down
```

This will stop and remove the containers. However, the data in the named volumes (e.g., `db_data`, `backend_data`) will persist.

**Data Persistence:**

* The data for the Postgres database is stored in the `db_data` volume. This ensures that your database data is not lost when the containers are stopped or removed.

* The `backend_data` volume is available for the backend service to store persistent data. If your backend application doesn't require persistent data storage, you can remove the `backend_data` volume from the `docker-compose.yml` file.

**Important Notes:**

* **Network:** The services can communicate with each other using their service names (e.g., `db`, `backend`, `frontend`) as hostnames. Docker Compose sets up a network that allows this communication.

* **Environment Variables:** The `docker-compose.yml` file uses environment variables (e.g., `POSTGRES_USER`, `POSTGRES_PASSWORD`, `REACT_APP_API_BASE_URL`). Make sure to set these appropriately, especially the database credentials. For production environments, consider using more secure methods for managing secrets.