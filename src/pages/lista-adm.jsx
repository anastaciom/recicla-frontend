import {
  Badge,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
  Modal,
  Form,
  FormLabel,
  Dropdown,
} from "react-bootstrap"; //TODO:'FormLabel', 'Dropdown'e 'Badge' NÃO ESTAO SENDO USADOS
import InputMask from "react-input-mask";
import {
  BsFilePlus,
  BsPen,
  BsPeopleFill,
  BsPlusCircleFill,
  BsSearch,
  BsTrash,
} from "react-icons/bs"; //TODO:'BsFilePlus' NÃO ESTA SENDO USADO
import "../style/css.css";
import { useEffect } from "react";
import { Autenticacao } from "../config/Autenticacao";
import React, { useState } from "react";

import { toast } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../services/api";

const AdicionarAdministrador = (props) => {
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    //TODO:'fetchData' NÃO ESTA SENDO CHAMADO
    const fetchData = async (url, setterFunction) => {
      try {
        const response = await API.get(url);
        setterFunction(response.data);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
  }, []);

  const handleSubmit = () => {
    const dataToSend = {
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
      cpf: cpf,
    };
    console.log(dataToSend);

    API.post("/administrador", dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Administrador criado com sucesso:", response.data);
          setNome("");
          setEmail("");
          setCpf("");
          setTelefone("");
          toast.success("Administrador criado com sucesso!");
          props.onHide();
          window.location.reload();
        } else {
          console.error("Resposta inválida ao criar Administrador:", response);
          toast.error(
            "Erro ao criar Administrador. Resposta inválida do servidor."
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao criar Administrador:", error.response.data);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar administrador.";

        toast.error(`Erro ao criar administrador: ${errorMessage}`);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EF7A2A" }}>Criar Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* TODO: CASO QUEIRA, DA PRA REFATORAR OS ITENS ABAIXO */}
          <Form.Label className="text-orange">Nome Completo</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Form.Label className="text-orange">CPF</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Form.Label className="text-orange">E-mail</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label className="text-orange">Telefone</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          className="rounded btn-orange w-100"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function EditarAdministrador(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [administrador, setAdministrador] = useState(null);

  const [administradorSelecionadoId, setAdministradorSelecionadoId] = useState(
    props.administradorId
  );

  useEffect(() => {
    const fetchData = async (url, setterFunction) => {
      try {
        const response = await API.get(url);
        setterFunction(response.data);

        setNome(response.data.user.name);
        setCpf(response.data.cpf);
        setEmail(response.data.user.email);
        setTelefone(response.data.user.phone);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData(`/administrador/${props.administradorId}`, setAdministrador);
  }, [props.administradorId]);

  const handleSubmit = () => {
    const dataToSend = {
      cpf: cpf,
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
    };
    console.log(dataToSend);
    console.log(props.administradorId);
    API.put(`/administrador/${props.administradorId}`, dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Administrador atualizado com sucesso:", response.data);
          toast.success("Administrador atualizado com sucesso");
          props.onHide();

          setAdministrador(response.data);
          window.location.reload();
          console.log(
            "Após a atualização do estado administrador:",
            administrador
          );
        } else {
          console.error(
            "Resposta inválida ao atualizar administrador:",
            response
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar administrador:", error);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar administrador.";

        toast.error(`Erro ao criar administrador: ${errorMessage}`);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EF7A2A" }}>
          Editar Administrador
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label className="text-orange">Nome Completo</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Form.Label className="text-orange">CPF</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <Form.Label className="text-orange">E-mail</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label className="text-orange">Telefone</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          className="rounded btn-orange w-100"
          onClick={handleSubmit}
        >
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ListarAdministradores() {
  const [administradorData, setAdministradorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [administradorSelecionadoId, setAdministradorSelecionadoId] =
    useState(null);
  const [modalAdicionarShow, setModalAdicionarShow] = useState(false);
  const [modalEditarShow, setModalEditarShow] = useState(false);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [administradorParaExcluir, setAdministradorParaExcluir] =
    useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  console.log(administradorData);

  const handleExcluirAdministrador = (administradorId) => {
    API.delete(`/administrador/${administradorId}`)
      .then((response) => {
        if (response && response.status === 200) {
          toast.success("Administrador excluído com sucesso!");
          setAdministradorData((prevAdministradores) =>
            prevAdministradores.filter(
              (administrador) => administrador.id !== administradorId
            )
          );
        } else {
          console.error(
            "Resposta inválida ao excluir administrador:",
            response
          );
          toast.error(
            "Erro ao excluir administrador. Resposta inválida do servidor."
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir administrador:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao excluir administrador.";
        toast.error(`Erro ao excluir administrador: ${errorMessage}`);
      });
  };

  const ConfirmacaoModal = ({ show, onHide, onConfirm, mensagem }) => {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{mensagem}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-orange" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="danger" className="btn-orange" onClick={onConfirm}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const filteredAdministradores = administradorData
    ? administradorData.filter((administrador) => {
        const searchString = searchQuery.toLowerCase();
        return (
          administrador.user.name.toLowerCase().includes(searchString) ||
          administrador.cpf.includes(searchString) ||
          administrador.user.email.toLowerCase().includes(searchString)
        );
      })
    : [];

  const handleExcluirConfirmacao = (administradorId) => {
    setAdministradorParaExcluir(administradorId);
    setShowConfirmacaoModal(true);
  };

  const handleConfirmarExclusao = () => {
    handleExcluirAdministrador(administradorParaExcluir);
    setShowConfirmacaoModal(false);
  };

  const handleCancelarExclusao = () => {
    setAdministradorParaExcluir(null);
    setShowConfirmacaoModal(false);
  };

  // Token de autenticação
  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  // Configuração do cabeçalho com o token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    API.get("/administrador", config)
      .then((response) => {
        setAdministradorData(response.data);

        if (!showSuccessMessage) {
          toast.success("Administradores listados com sucesso!");
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter os dados do administrador:", error);
        toast.error(
          "Erro ao criar administrador. Verifique os dados e tente novamente."
        );
      });
  }, [searchQuery]);

  const [modalShow, setModalShow] = React.useState(false);

  // Função para paginar os resultados
  const paginateResults = (data, page, resultsPerPage) => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Definimos a quantidade de resultados por página
  const resultsPerPage = 5;

  // Filtramos os resultados da página atual
  const currentResults = administradorData
    ? paginateResults(administradorData, currentPage, resultsPerPage)
    : [];

  // Calculamos o número total de páginas
  const totalPages = administradorData
    ? Math.ceil(administradorData.length / resultsPerPage)
    : 0;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
        <Col
          md={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            ADMINISTRADOR
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            CATADOR
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            ASSOCIAÇÃO
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            OP. LOGÍSTICO
          </Button>
        </Col>
        <hr className="m-4" />
        <Col
          md={12}
          className="d-flex align-items-center justify-content-between"
        >
          <InputGroup className="w-75">
            <FormControl
              className="custom-focus"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="btn-orange" id="button-addon2">
              <BsSearch className="" /> Buscar
            </Button>
          </InputGroup>
          <Button
            type="submit"
            className="btn-orange"
            onClick={() => setModalAdicionarShow(true)}
          >
            <BsPlusCircleFill /> Adicionar
          </Button>
          <AdicionarAdministrador
            show={modalAdicionarShow}
            onHide={() => setModalAdicionarShow(false)}
          />
        </Col>
        <Col>
          <h3 className="m-3" style={{ color: "#EF7A2A" }}>
            Lista de Administradores
          </h3>
          <ListGroup as="ol" numbered>
            {paginateResults(
              filteredAdministradores,
              currentPage,
              resultsPerPage
            ).map((administrador, index) => (
              <ListGroup.Item
                key={index}
                action
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{administrador.user.name}</div>
                  CPF: {administrador.cpf} <br />
                  Email: {administrador.user.email}
                </div>
                <div>
                  <ConfirmacaoModal
                    show={showConfirmacaoModal}
                    onHide={handleCancelarExclusao}
                    onConfirm={handleConfirmarExclusao}
                    mensagem="Tem certeza que deseja excluir este administrador?"
                  />

                  <Button
                    type="submit"
                    className="mx-2 btn-orange"
                    onClick={() => {
                      setAdministradorSelecionadoId(administrador.id);
                      setModalEditarShow(true);
                    }}
                  >
                    <BsPen /> Editar
                  </Button>
                  <Button
                    type="submit"
                    className="btn-orange"
                    onClick={() => handleExcluirConfirmacao(administrador.id)}
                  >
                    <BsTrash /> Excluir
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {administradorSelecionadoId && (
            <EditarAdministrador
              show={modalEditarShow}
              onHide={() => setModalEditarShow(false)}
              administradorId={administradorSelecionadoId}
            />
          )}
          <Pagination className="pagination-orange mt-3 justify-content-center">
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage > 1 ? prevPage - 1 : prevPage
                )
              }
            >
              Anterior
            </Pagination.Prev>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < totalPages ? prevPage + 1 : prevPage
                )
              }
            >
              Próxima
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default ListarAdministradores;
