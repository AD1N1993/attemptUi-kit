down:
	docker-compose down

restart:
	docker-compose down
	docker-compose up --build -d

pull-build:
	docker-compose pull
	docker-compose up --build -d
	docker-compose exec app composer install

clear-d:
	docker-compose exec app bin/console doctrine:database:drop --force
	docker-compose exec app bin/console doctrine:database:create
	docker-compose exec app bin/console doctrine:migrations:migrate -n
	docker-compose exec app bin/console doctrine:fixtures:load -n

cache:
	docker-compose exec app bin/console cache:clear --no-debug
	docker-compose exec app bin/console redis:flushdb --client=cache -n

token-admin:
	docker-compose exec app bin/console lexik:jwt:generate-token --user-class App\\Entity\\User nem@webcrt.ru