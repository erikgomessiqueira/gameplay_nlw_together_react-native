import React from 'react'
import { FlatList, ImageBackground, Text, View } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { theme } from '../../global/styles/theme'
import { styles } from './style'
import BannerPng from '../../assets/banner.png'
import { ListHeader } from '../../components/ListHeader'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { AppointmentProps } from '../../components/Appointments'

type Params = {
    guildSelected: AppointmentProps
}

export function AppointmentDetails(){
    const routes = useRoute()
    const { guildSelected } = routes.params as Params


    const members = [
        {
            id: '1',
            username: 'Erik',
            avatar_url: 'https://avatars.githubusercontent.com/u/67563562?v=4',
            status: 'online'
        },
        {
            id: '2',
            username: 'Eriksan',
            avatar_url: 'https://avatars.githubusercontent.com/u/67563562?v=4',
            status: 'offline'
        }
    ]
    return(
        <Background>
            <Header 
                title='Detalhes'
                action={
                    <BorderlessButton>
                        <Fontisto 
                            name='share'
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerPng}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader 
                title='Jogadores'
                subtitle='Total 3'
            />

            <FlatList 
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) =>(
                    <Member data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                style={styles.members}
            />

            <View style={styles.footer}>
                <ButtonIcon title='Entrar na partida'/>
            </View>
        </Background>
    )
}
