<?php

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                // Cadena de Conexion Local
				$conectar = $this->dbh = new PDO("mysql:host=mysql-sotteco.alwaysdata.net;dbname=sotteco_bd","sotteco","cordobasbanpro1234");
               
				return $conectar;
			} catch (Exception $e) {
				print "¡Error BD!: " . $e->getMessage() . "<br/>";
				die();
			}
        }

        /*  Set Name para utf 8 español */
        public function set_names(){
			return $this->dbh->query("SET NAMES 'utf8'");
        }

        /* Link del proyecto */
        public static function ruta(){
            //Local
			return "https://sotteco-app.onrender.com/";
           
          
		}

    }
?>