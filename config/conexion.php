<?php
    
    session_start();

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                // Cadena de Conexion Local
				$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=prue","root","");
               
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
			return "http://localhost/";
           
          
		}

    }
?>