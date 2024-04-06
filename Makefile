# Define default target
.PHONY: all frontend

# Set default target to 'frontend'
all: frontend

# Define 'frontend' target for building Docker image
frontend:
	docker build --platform=linux/amd64 -t wms-frontend:1.0.0 .
