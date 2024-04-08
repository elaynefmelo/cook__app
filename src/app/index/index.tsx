import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./styles"
import { Ingredient } from "@/components/Ingredient";
import { useState } from "react";
import { Selected } from "@/components/Selected";
import { router } from "expo-router";
 

export default function Index(){
    //estado para poder clicar no botão, isso será usado para a trilha, ele se inicia aqui, mas tbm está presente no componente e no styles do componente ingredient
    const [selected, setSelected] = useState<String[]>([])

    function handleToggleSelected(value: string){
        if(selected.includes(value)){
            return setSelected((state) => state.filter((item) => item !== value))
        }

        setSelected((state) => [...state, value])
    }
//função de alerta, garante que o usuario saiba o q esta fazendo
    function handleClearSelected(){
        Alert.alert("Limpar", "Deseja limpar tudo?",
        [
            {text: "Não", style: "cancel" },
            {text: "Sim", onPress: () => setSelected([])}
        ])
       
    }
    // função de navegação ate a pagina desejada
    function handleSearch() {
        router.navigate("/recipes/")
    }
    //Ambas funcões foram adicionadas na função selected (que fou criada no componet Selected), para que o usuario possa navegar até la 
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text> 
                </Text>
            <Text style={styles.message}> 
                Descubra receitas baseadas nos produtos que você escolheu. 
            </Text>

            <ScrollView contentContainerStyle={styles.ingredients} 
            showsVerticalScrollIndicator={false}>
                {Array.from({ length: 100 }).map((_, index) => (
                    <Ingredient 
                    key={index}  
                    name={""} 
                    image={""} 
                    selected = {selected.includes(String(index))}
                    onPress={() => handleToggleSelected(String(index))}
                    />
                ))}
            </ScrollView>
            
            { selected.length > 0 && (
                <Selected 
                quantity={selected.length} 
                onClear={handleClearSelected}
                onSearch={handleSearch}
            />
            )}
        </View>
    )
 }