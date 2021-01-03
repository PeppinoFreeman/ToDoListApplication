Vous avez à disposition les fichiers suivants pour exécuter/tester l'application :

- **build.sh :** pour compiler et démarrer l'application sur un serveur local avec le port 4000.
- **front_test.sh :** pour tester l'application côté client. Lance le débugger Jasmine sur le navigateur.
- **back_test.sh :** pour tester l'application côté server. Lance le débugger Mocha dans la console.

# Application To Do List 

*Ceci n'est qu'un extrait du fichier de l'architecture.*

**Résumé des fonctionnalités de l’application :**

- L’application affiche la liste de tâches des utilisateurs en leur offrant la possibilité d’ajouter ou modifier une tâche par l’envoi d’un formulaire.

- Chaque tâche possède un titre, une catégorie, un type (Ponctuel ou Long cours), une date de début et de fin, un état de complétion et un état de retard. A l’exception de la date de début et du type, tous les paramètres sont modifiables. 
L’utilisateur peut également ajouter une nouvelle catégorie ou supprimer celles existantes par l’envoi d’un formulaire.

- L’utilisateur peut consulter le bilan total des tâches réalisées dans les temps, avec un retard ou non réalisées. Ainsi qu’un bilan périodique basé sur les dates saisies par l’utilisateur. 

- L’utilisateur peut naviguer entre quatre vues qui contiennent : la liste de tâche, le formulaire d’édition d’une tâche, le formulaire d’édition d’une catégorie, et le bilan des tâches. L’utilisateur est accueilli par la première vue.  
