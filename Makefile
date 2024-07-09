IMAGE_NAME := tap_caviar_frontend
CONTAINER_NAME := tap_caviar_frontend_container
deploy:
	docker build -t $(IMAGE_NAME) . && \
	docker stop $(CONTAINER_NAME) >/dev/null 2>&1 || true && \
	docker rm $(CONTAINER_NAME) >/dev/null 2>&1 || true && \
	docker run -d -p 127.0.0.1:3000:80 --name $(CONTAINER_NAME) $(IMAGE_NAME)

logs:
	docker logs -f $(CONTAINER_NAME)
