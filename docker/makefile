
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

.PHONY: deploy_backend
deploy_backend:
	# cd app  && docker build -t $(BACKEND_NAME) .   -f  ./Dockerfile
	# docker tag $(BACKEND_NAME) $(BACKEND_DOCKER_REPO)/$(BACKEND_NAME):$(BACKEND_VERSION)
	docker push $(BACKEND_DOCKER_REPO)/$(BACKEND_NAME):$(BACKEND_VERSION)
	


.PHONY: run_backend
run_backend:
	docker pull $(BACKEND_DOCKER_REPO)/$(BACKEND_NAME):$(BACKEND_VERSION)
	docker run -p 1337:1337/tcp -itd $(BACKEND_DOCKER_REPO)/$(BACKEND_NAME):$(BACKEND_VERSION)