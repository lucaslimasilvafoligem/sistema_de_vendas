import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInCity1735787912459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO city ("id", "name", "state_id") VALUES (1, 'Afonso Cláudio', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (2, 'Vitória', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (3, 'Cariacica', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (4, 'Serra', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (5, 'Vila Velha', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (6, 'Linhares', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (7, 'Colatina', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (8, 'Guarapari', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (9, 'Santa Teresa', 8);
            INSERT INTO city ("id", "name", "state_id") VALUES (10, 'Anchieta', 8);

            INSERT INTO city ("id", "name", "state_id") VALUES (11, 'São Paulo', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (12, 'Campinas', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (13, 'Santos', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (14, 'Sorocaba', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (15, 'Ribeirão Preto', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (16, 'São José dos Campos', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (17, 'Barretos', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (18, 'Presidente Prudente', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (19, 'Taubaté', 25);
            INSERT INTO city ("id", "name", "state_id") VALUES (20, 'Jundiaí', 25);

            INSERT INTO city ("id", "name", "state_id") VALUES (21, 'Rio de Janeiro', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (22, 'Niterói', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (23, 'Petrópolis', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (24, 'Cabo Frio', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (25, 'Campos dos Goytacazes', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (26, 'Volta Redonda', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (27, 'Nova Friburgo', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (28, 'Macaé', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (29, 'Angra dos Reis', 19);
            INSERT INTO city ("id", "name", "state_id") VALUES (30, 'Teresópolis', 19);

            INSERT INTO city ("id", "name", "state_id") VALUES (31, 'Belo Horizonte', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (32, 'Uberlândia', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (33, 'Contagem', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (34, 'Juiz de Fora', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (35, 'Betim', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (36, 'Montes Claros', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (37, 'Uberaba', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (38, 'Governador Valadares', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (39, 'Ipatinga', 13);
            INSERT INTO city ("id", "name", "state_id") VALUES (40, 'Divinópolis', 13);

            INSERT INTO city ("id", "name", "state_id") VALUES (41, 'Porto Alegre', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (42, 'Caxias do Sul', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (43, 'Pelotas', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (44, 'Santa Maria', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (45, 'Canoas', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (46, 'Gravataí', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (47, 'Viamão', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (48, 'Novo Hamburgo', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (49, 'Rio Grande', 21);
            INSERT INTO city ("id", "name", "state_id") VALUES (50, 'Passo Fundo', 21);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public.city;
        `);
    }

}
