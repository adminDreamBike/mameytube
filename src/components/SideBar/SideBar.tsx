import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  Text,
  Divider,
} from "@chakra-ui/react";
import { FaHouse } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";
import { RiChatFollowUpFill } from "react-icons/ri";
import { LuHistory, LuListVideo, LuThumbsUp } from "react-icons/lu";
import { GrChannel } from "react-icons/gr";
import { LiaFileVideoSolid } from "react-icons/lia";
import { MdOutlineLocalMovies, MdOutlineGames } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { HiOutlineFire } from "react-icons/hi2";
import { CiMusicNote1, CiTrophy, CiBrightnessUp } from "react-icons/ci";
import { TbLivePhoto } from "react-icons/tb";
import { PiNewspaper } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import NextLink from "next/link";
import { CirclePlay } from "lucide-react";

export const SideBar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        variant="secondary"
        onEsc={() => onClose}
        closeOnOverlayClick={true}
      >
        <DrawerOverlay width="30vh !important" bg="transparent" pointerEvents="none" />
        <DrawerContent
          width="30vh !important"
          borderRight="1px solid lightgray"
          padding="20px"
          backgroundColor="white"
        >
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            flexDirection="row"
          >
            <Flex alignItems="center" gap="2">
              <IconButton
                variant={'ghost'}
                onClick={onClose}
                aria-label="button open drawer"
                icon={<RxHamburgerMenu />}
                size="lg"
                fontSize="20px"
              />
              <Link href="/" as={NextLink} alignItems="center" display="flex">
                <Icon as={CirclePlay} boxSize={26} color="#F4A644" />
                <Text fontWeight="bold" fontSize="20px">MaMeyTube</Text>
              </Link>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" marginTop="20px">
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={FaHouse} boxSize={5} />
                <Text marginLeft="10px">Inicio</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={SiYoutubeshorts} boxSize={5} />
                <Text marginLeft="10px">Shorts</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={RiChatFollowUpFill} boxSize={5} />
                <Text marginLeft="10px">Suscripciones</Text>
              </Link>
              <Divider
                orientation="horizontal"
                visibility="visible"
                border="1px solid lightgray"
              />
              <Link
                href="/"
                as={NextLink}
                display="flex"
                marginTop="30px"
                marginBottom="10px"
              >
                <Icon as={GrChannel} boxSize={5} />
                <Text marginLeft="10px">Tu Canal</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={LuHistory} boxSize={5} />
                <Text marginLeft="10px">Historial</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={LuListVideo} boxSize={5} />
                <Text marginLeft="10px">Lista de Reproducciones</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={LiaFileVideoSolid} boxSize={5} />
                <Text marginLeft="10px">Mis Videos</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={MdOutlineLocalMovies} boxSize={5} />
                <Text marginLeft="10px">Mis Peliculas</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={IoTimeOutline} boxSize={5} />
                <Text marginLeft="10px">Ver Mas Tarde</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={LuThumbsUp} boxSize={5} />
                <Text marginLeft="10px">Videos que me Gustan</Text>
              </Link>
              <Divider
                orientation="horizontal"
                visibility="visible"
                border="1px solid lightgray"
              />
              <Text fontWeight="bold" marginTop="20px" marginBottom="10px">
                Suscripciones
              </Text>
              <Divider
                orientation="horizontal"
                visibility="visible"
                border="1px solid lightgray"
              />
              <Text fontWeight="bold" marginTop="20px" marginBottom="10px">
                Explorar
              </Text>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={HiOutlineFire} boxSize={5} />
                <Text marginLeft="10px">Tendencias</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={CiMusicNote1} boxSize={5} />
                <Text marginLeft="10px">Musica</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={TbLivePhoto} boxSize={5} />
                <Text marginLeft="10px">En Directo</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={MdOutlineGames} boxSize={5} />
                <Text marginLeft="10px">VideoJuegos</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={PiNewspaper} boxSize={5} />
                <Text marginLeft="10px">Noticias</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={CiTrophy} boxSize={5} />
                <Text marginLeft="10px">Deportes</Text>
              </Link>
              <Link href="/" as={NextLink} display="flex" marginBottom="10px">
                <Icon as={CiBrightnessUp} boxSize={5} />
                <Text marginLeft="10px">Aprendizaje</Text>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
