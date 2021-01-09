run.server:
	./bin/rails server -b 0.0.0.0

run.server.debug:
	./bin/rdebug-ide --host 0.0.0.0 --port 1234 --dispatcher-port 1234 -- bin/rails s

run.web:
	cd ./front_end && yarn dev

run.routes:
	./bin/rails routes > routes.txt