from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from quiz.models import Question, Answer, Quiz


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('url', 'username', 'email', 'is_staff')


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer


class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = ('id', 'answer', 'is_correct')


# Serializers define the API representation.
class QuestionsSerializer(serializers.HyperlinkedModelSerializer):
  answers = AnswerSerializer(many=True)
  class Meta:
    model = Question
    fields = ('question', 'answers')


class QuizSerializer(serializers.ModelSerializer):
  questions = QuestionsSerializer(many=True)

  class Meta:
    model = Quiz
    fields = ('id', 'title', 'picture', 'description', 'questions')

# ViewSets define the view behavior.
class QuizViewSet(viewsets.ModelViewSet):
  queryset = Quiz.objects.all()
  serializer_class = QuizSerializer


# Routers
router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'quizzes', QuizViewSet)
