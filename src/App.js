import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('/repositories').then( (result) => {
      const {status, data} = result;

      if (status === 200) {
        setRepositories(data);
      }
    });

  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    
    try {
      const { data, status } = await api.post(`/repositories/${id}/like`);

      if (status === 200) {
        const repos = repositories.map(rep => {
          if (rep.id === id) {
            return data;
          }
          return rep;
        });
        setRepositories(repos);
      }

    } catch (err) {
      console.log(err);
    }
  }

  console.log( repositories );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
        { repositories.map((item) => 
            <View style={styles.repositoryContainer} key={ item.id }>

              <Text style={styles.repository}>{ item.title }</Text>

              <View style={styles.techsContainer}>
                { item.techs.map( (tech, index) => (<Text style={styles.tech} key={ index }>
                      { tech }
                  </Text>)
                )}
              </View>
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${ item.id }`}
                >
                  { item.likes } { item.likes === 1? "curtida": "curtidas" }
                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository( item.id )}
                testID={`like-button-${ item.id }`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
